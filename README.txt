CMDR
	The main purpose of this program is to create custom console commands for the
	user. These commands access 	the ".exe" files that the user specifies and 
	automatically adds them to the "Cmds" folder that is linked to the "Path" 
	Environment Variable.

Example: 
	if "chrome.exe" was added to the path, typing "chrome" in the console will 
	execute the "chrome.exe" file

Getting Started:
	1. Extract the zip file to a place of preference. 
	2. Right click the "cmdrInstaller.exe" >> Run as administrator.

Prerequisites:
	There should not be a directory "C:/Cmds" before the installer is initially run.

Uninstalling:
	1. Make sure that no programs are accessing the "C:/Cmds" directory
	2. Right click the "cmdsUninstaller.exe" >> Run as administrator

#####################################################################################
EXAMPLES:

Add Command Example:
	1. Run "cmdr.exe"
	2. Click on the "+" button OR right click on the list >> Add new variable
	3. Fill out the following fields:
		name: 	"chrome"
		path:	"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe"
		params:	(none)
		type >> select ".bat" or ".cmd"
	4. Click "Save"


Remove Command Example:
	1. Run "cmdr.exe"
	2. Right click on the list >> Remove %variable name%
	3. Click "Yes" on the prompt


Other Useful Command Examples:

	Microsoft Built in Jscript Compiler
		name: 	"jsc"
		path:	"C:\Windows\Microsoft.NET\Framework\v4.0.30319\jsc.exe"
		params:	"/nologo"
		type >> select ".bat" or ".cmd"

	Microsoft Built in C# Compiler
		name: 	"csc"
		path:	"C:\Windows\Microsoft.NET\Framework\v4.0.30319\csc.exe"
		params:	"/nologo"
		type >> select ".bat" or ".cmd"


####################################################################################
CREDITS
Built in C# and Jscript ASP.NET framework

Authors
Josh Uchytil

License
This project is licensed under the MIT License

Acknowledgments
Hat tip to: 
https://limbioliong.wordpress.com/2014/01/19/programmatically-addingremoving-paths-tofrom-the-system-path/