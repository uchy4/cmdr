using System;
using System.IO;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Windows.Forms;
using System.Security;

class CreateDir
{
    public static void Main()
    {
        string path = @"C:\Cmds";
        bool check = false;

        try
        {
            // Determine whether the directory exists.
            if (!Directory.Exists(path))
            {
                check = true;
                // Try to create the directory.
                DirectoryInfo di = Directory.CreateDirectory(path);
                Console.WriteLine("The directory was created successfully at {0}.", Directory.GetCreationTime(path));

                //create a new path variable
                string[] args = new string[3];
                args[0] = "/a";
                args[1] = path;
                new PathVar(args);

                MessageBox.Show("Cmdr setup complete");
            }
            else
            {
                Console.WriteLine("The directory already exists");

                MessageBox.Show("Installation has already been completed");
            }
        }
        catch (SecurityException e)
        {
            Console.WriteLine("The process failed: {0}", e.ToString());
            if (check)
            {
                Directory.Delete(path);
            }
            MessageBox.Show("INCOMPLETE: Run installer as Admin");
        }
        catch (Exception e)
        {
            Console.WriteLine("The process failed: {0}", e.ToString());
        }
        finally {}
    }
}
class PathVar
{
    #region Pre-run Checks
    enum Action
    {
        NO_ACTION = 0,
        ADD_PATH = 1,
        REMOVE_PATH = 2
    }

    // DisplayUsage() displays instructions on the command line
    // of this program.
    static void DisplayUsage()
    {
        Console.WriteLine("Usage : SystemPathModifier [/a or /r] [Path].");
    }

    // CheckArguments() interprets the command line of the program
    // and sets values for the variables of this program.
    static bool CheckArguments(string[] args, out Action action, out string strSpecifiedPath)
    {
        // Assign receiver to default value.
        action = Action.NO_ACTION;
        strSpecifiedPath = "";

        // Ensure that there are at least 2 arguments.
        if (args.Length < 2)
        {
            DisplayUsage();
            return false;
        }

        if (args[0] == "/a")
        {
            action = Action.ADD_PATH;
            strSpecifiedPath = args[1];
            return true;
        }
        else if (args[0] == "/r")
        {
            action = Action.REMOVE_PATH;
            strSpecifiedPath = args[1];
            return true;
        }
        else
        {
            Console.WriteLine("Invalid flag : {0:S}.", args[0]);
            DisplayUsage();
            return false;
        }
    }
    #endregion

    #region System Path-related Helper functions.
    // GetCurrentSystemPaths() obtains the system path from the registry setting :
    // HKEY_LOCAL_MACHINE\System\CurrentControlSet\Control\Session Manager\Environment
    // After obtaining this registry setting (which is a string), this function 
    // splits up the string into its constutuent parts (separated by a ';') and
    // stores each sub-string into a string array.
    static string[] GetCurrentSystemPaths()
    {
        string strPath = System.Environment.GetEnvironmentVariable("Path", EnvironmentVariableTarget.Machine);

        string[] split = strPath.Split(new Char[] { ';' });

        return split;
    }

    // AddPath() adds a new path to the system path.
    static void AddPath(string strNewPath)
    {
        string[] strPaths = GetCurrentSystemPaths();

        string strFoundPath = Array.Find(strPaths, new PathMatcherPredicate(strNewPath).MatchPath);

        if (strFoundPath == null)
        {
            // Path not found. We now add it in.
            int iSize = strPaths.Length;
            // We increment the strPaths array by one more element.
            Array.Resize(ref strPaths, iSize + 1);
            // Append strNewPath into the strPaths array.
            strPaths[iSize] = strNewPath;

            // We construct the system path string by concatenating
            // all elements from the strPaths array, separated by a ';'.
            string strNewSystemPath = ConcatStringArray(ref strPaths);

            // Replace the current system path with strNewSystemPath.
            System.Environment.SetEnvironmentVariable("Path", strNewSystemPath, EnvironmentVariableTarget.Machine);
            Console.WriteLine("New path successfully added to system.");
        }
        else
        {
            Console.WriteLine("New path already in system.");
        }
    }

    // RemovePath() removes a path from the system path.
    static void RemovePath(string strRemovalPath)
    {
        string[] strPaths = GetCurrentSystemPaths();

        string strFoundPath = Array.Find(strPaths, new PathMatcherPredicate(strRemovalPath).MatchPath);

        if (strFoundPath == null)
        {
            Console.WriteLine("Path is not in system.");
        }
        else
        {
            // We construct the new system path string by concatenating
            // all elements from the strPaths array, separated by a ';'.
            string strNewSystemPath = ConcatStringArray(ref strPaths, strRemovalPath);

            // Replace the current system path with strNewSystemPath.
            System.Environment.SetEnvironmentVariable("Path", strNewSystemPath, EnvironmentVariableTarget.Machine);
            Console.WriteLine("Path [{0:S}] successfully removed from system.", strRemovalPath);
        }
    }

    // ConcatStringArray() concatenates all strings from
    // the input strArray. Each string separated by a ';'.
    static string ConcatStringArray(ref string[] strArray)
    {
        int iSize = strArray.Length;
        int i = 0;
        string strRet = strArray[0];

        for (i = 1; i < iSize; i++)
        {
            strRet += String.Format(";{0:S}", strArray[i]);
        }

        return strRet;
    }

    // This overload of ConcatStringArray() concatenates all strings from
    // the input strArray but will ensure that strExclude is excluded. 
    // Each string separated by a ';'.
    static string ConcatStringArray(ref string[] strArray, string strExclude)
    {
        string strRet = "";

        foreach (string str in strArray)
        {
            if (String.Compare(str, strExclude, true) != 0)
            {
                if (strRet != "")
                {
                    strRet += ";";
                }

                strRet += str;
            }
        }

        return strRet;
    }

    // The PathMatcherPredicate class serves as the functor
    // for the Predicate delegate of the Array.Find() method.
    class PathMatcherPredicate
    {
        public PathMatcherPredicate(string strSpecifiedPath)
        {
            m_strSpecifiedPath = strSpecifiedPath;
        }

        public bool MatchPath(string strTestPath)
        {
            if (String.Compare(strTestPath, m_strSpecifiedPath, true) == 0)
            {
                return true;
            }
            else
            {
                return false;
            }
        }

        private string m_strSpecifiedPath;
    }

    #endregion

    public PathVar(string[] args)
    {
        // Check the arguments for correctness.
        // Note that if the specified path contains spaces,
        // the path must be enclosed in quotations, e.g. :
        // "c:\my path"
        Action action;
        string strSpecifiedPath;

        if (CheckArguments(args, out action, out strSpecifiedPath) == false)
        {
            return;
        }

        if (action == Action.ADD_PATH)
        {
            AddPath(strSpecifiedPath);
        }
        else if (action == Action.REMOVE_PATH)
        {
            RemovePath(strSpecifiedPath);
        }
    }
}
