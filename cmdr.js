import System;
import System.IO;
import System.Windows.Forms;
import System.Linq;
import System.Drawing;
import Accessibility;


class Form1 extends Form
{
    var btn : Button;
    var tt  : ToolTip;
    var listItems : Array;
    var dgv : DataGridView;
    var toDelete;
    var info;
    var txt1;
    var txt2;
    var txt3;
    var txt4;
    var type;
    var form1;


    function Form1()
    {
        this.BackColor = Color.Snow;
                
        dgv = new DataGridView();
        dgv.ColumnCount = 2;
        dgv.ColumnHeadersVisible = true;
        var columnHeaderStyle = new DataGridViewCellStyle();
        columnHeaderStyle.BackColor = Color.LightBlue;
        columnHeaderStyle.Font = new System.Drawing.Font("Verdana", 10);
        dgv.Bounds = new Rectangle(10,15, this.Width-35, 200);
        dgv.ColumnHeadersDefaultCellStyle = columnHeaderStyle;
        dgv.Columns[0].Name = "name";
        dgv.Columns[0].Width = 60;
        dgv.Columns[1].Name = "path";
        dgv.Columns[1].Width = 150;
        dgv.RowHeadersVisible = false;
        dgv.CellBorderStyle = DataGridViewCellBorderStyle.None;
        dgv.ColumnHeadersBorderStyle = DataGridViewHeaderBorderStyle.Single;
        dgv.AllowUserToResizeColumns = false;
        dgv.AllowUserToResizeRows = false;
        dgv.AllowUserToAddRows = false;
        dgv.BackgroundColor = System.Drawing.SystemColors.Control;
        dgv.ClearSelection();
        
        Populate();
        
        dgv.CellBorderStyle = DataGridViewCellBorderStyle.None;
        dgv.Columns[0].DefaultCellStyle.SelectionBackColor = Color.Gray;
        dgv.Columns[1].DefaultCellStyle.SelectionBackColor = Color.Gray;
        dgv.SelectionMode = DataGridViewSelectionMode.FullRowSelect;
        dgv.MultiSelect = false;
        
        dgv.Columns[0].DefaultCellStyle.Font = new System.Drawing.Font("Verdana", 9, System.Drawing.FontStyle.Italic);   
        dgv.Columns[1].DefaultCellStyle.Font = new System.Drawing.Font("Verdana", 9, System.Drawing.FontStyle.Italic);    
        dgv.Columns[0].DefaultCellStyle.Alignment = DataGridViewContentAlignment.MiddleRight;
        dgv.Columns[0].HeaderCell.Style.Alignment = DataGridViewContentAlignment.MiddleRight;
        dgv.Columns[0].DefaultCellStyle.Padding = new System.Windows.Forms.Padding(5,0,5,0);
        dgv.Columns[1].DefaultCellStyle.Padding = new System.Windows.Forms.Padding(5,0,5,0);
        
        dgv.Columns[1].AutoSizeMode = DataGridViewAutoSizeColumnMode.Fill;
        dgv.RowHeadersWidthSizeMode = DataGridViewRowHeadersWidthSizeMode.DisableResizing;
        dgv.ColumnHeadersHeightSizeMode = DataGridViewColumnHeadersHeightSizeMode.DisableResizing;

        dgv.add_MouseClick(dgv_MouseClick);
        Controls.Add(dgv);
        
        btn = new Button;
        btn.Text = "\u2795";
        tt = new ToolTip();
        tt.SetToolTip(btn, "Add a new variable");

        Controls.Add(btn);

        // Connect the function to the event.
        btn.add_Click(ButtonEventHandler1);

        btn.Dock = DockStyle.Bottom;
        btn.BackColor = Color.LightGreen;
        btn.Height = 35;
        this.Width = 500;
        dgv.Width = this.Width - 35;
        
        dgv.ReadOnly = true;
        dgv.Anchor = (AnchorStyles.Bottom | AnchorStyles.Right | AnchorStyles.Left | AnchorStyles.Top);
        
        this.Icon = new System.Drawing.Icon("cmdr.ico");
        
    }

    function Populate()
    {
        dgv.Rows.Clear();
        // Process the list of files found in the directory.
        if (!Directory.Exists("C:\\Cmds"))
        {
            MessageBox.Show("Please reinstall CMDR");
            Environment.Exit(0);
        }
        var dir = Directory.GetFiles("C:\\Cmds");
        for(var file in dir)
        {   
            var fn = dir(file);
            try
            {
                if (File.Exists(fn)) 
                {
                    var name = fn.split(".")[0].split("\\")[2];
                    var path = File.ReadAllLines(fn)[1].split(".exe")[0] + ".exe\""; 
                    dgv.Rows.Add(name,path);
                }
            }
            catch(err){}
        }
        //dgv.Columns.Add(del);
    }

    // Add an event handler to respond to the Click event raised
    // by the Button control.
    function ButtonEventHandler1(sender, e : EventArgs)
    {
        form1 = new Form();
        var btn1 = new Button;
        var btn2 = new Button;
        var strip = new Panel;
        var lab1 = new Label;
        var lab2 = new Label;
        var lab3 = new Label;
        var lab4 = new Label;
        txt1 = new TextBox;
        txt2 = new TextBox;
        txt3 = new TextBox;
        var bat = new RadioButton;
        var cmd = new RadioButton;
        
        info = new Command1;
        
        bat.Text = ".bat";
        cmd.Text = ".cmd";
        btn1.Text = "save";
        btn2.Text = "cancel";
        lab1.Text = "name:";
        lab2.Text = "path:";
        lab3.Text = "params:";
        lab4.Text = "type:";
        
        txt1.Name = "txt1";
        txt2.Name = "txt2";
        txt3.Name = "txt3";
        bat.Name = "bat";
        cmd.Name = "cmd";
        
        new ToolTip().SetToolTip(txt2, "Double click to browse");
        
        bat.add_Click(RadioEventHandler1);
        cmd.add_Click(RadioEventHandler1);
        
        txt2.add_DoubleClick(TextEventHandler1);

        txt1.Width = 130;
        txt2.Width = 130;
        txt3.Width = 130;
        lab1.Width = 50;
        lab2.Width = 50;
        lab3.Width = 50;
        lab4.Width = 50;
        bat.Width = 50;
        cmd.Width = 50;
        
        lab1.AutoSize = false;    
        lab1.TextAlign = ContentAlignment.MiddleRight;
        lab2.AutoSize = false;    
        lab2.TextAlign = ContentAlignment.MiddleRight;
        lab3.AutoSize = false;    
        lab3.TextAlign = ContentAlignment.MiddleRight;
        lab4.AutoSize = false;    
        lab4.TextAlign = ContentAlignment.MiddleRight;

        txt1.Location = new Point(55, 15);
        txt2.Location = new Point(55, 40);
        txt3.Location = new Point(55, 65);
        lab1.Location = new Point(5, 13);
        lab2.Location = new Point(5, 38);
        lab3.Location = new Point(5, 63);
        lab4.Location = new Point(5, 89);
        bat.Location = new Point(75, 90);
        cmd.Location = new Point(125, 90);

        strip.Dock = DockStyle.Bottom;
        btn1.Dock = DockStyle.Left;
        btn2.Dock = DockStyle.Right;

        strip.Controls.Add(btn1);
        strip.Controls.Add(btn2);
        form1.Controls.Add(lab1);
        form1.Controls.Add(lab2);
        form1.Controls.Add(lab3);
        form1.Controls.Add(lab4);
        form1.Controls.Add(txt1);
        form1.Controls.Add(txt2);
        form1.Controls.Add(txt3);
        form1.Controls.Add(strip);
        form1.Controls.Add(bat);
        form1.Controls.Add(cmd);

        form1.CancelButton = btn2;
        form1.AcceptButton = btn1;

        strip.Height = 25;
        btn1.Height = 25;
        btn1.Width = 50;
        btn2.Height = 25;
        btn2.Width = 50;
        form1.Width = 200;
        form1.Height = 160;
        
        btn1.add_Click(SubmitEventHandler2);

        form1.Padding = new System.Windows.Forms.Padding(5);
        form1.ControlBox = false;
        form1.FormBorderStyle = BorderStyle.FixedSingle;
        form1.StartPosition = FormStartPosition.CenterParent;
        form1.ShowDialog();
    }

    function TextEventHandler1(sender, e : EventArgs)
    {
        var ofd = new OpenFileDialog();
        ofd.CheckFileExists = true;
        ofd.CheckPathExists = true;
        ofd.Filter = "exe files (*.exe)|*.exe";
        ofd.InitialDirectory = "c:\\";
        ofd.Multiselect = false;
        
        if (ofd.ShowDialog() == System.Windows.Forms.DialogResult.OK)    
        {     
            txt2.Text = ofd.FileName;          
        }
    }

    function SubmitEventHandler2(sender, e : EventArgs)
    {
        info.SetVars(txt1.Text,txt2.Text,txt3.Text,type);
        info.CreateVar();
        Populate();
        form1.Dispose();
    }

    function RadioEventHandler1(sender, e : EventArgs)
    {
        type = sender.Name;
    }

    function DeleteHandler1(sender, e : EventArgs)
    {
        var text = dgv.Rows[(toDelete)].Cells[0].Value
        var result = MessageBox.Show("Do you want to permanently delete '" + text + "'", "", MessageBoxButtons.YesNo);
        if (result == System.Windows.Forms.DialogResult.Yes) {
            if(File.Exists("C:\\Cmds\\" + text + ".cmd"))
            {
                File.Delete("C:\\Cmds\\" + text + ".cmd");
            }
            else if(File.Exists("C:\\Cmds\\" + text + ".bat"))
            {
                File.Delete("C:\\Cmds\\" + text + ".bat");
            }
            dgv.Rows.RemoveAt(toDelete);
        }
    }

    function dgv_MouseClick(sender, e : MouseEventArgs)
    {
        if (e.Button == MouseButtons.Right)
        {
            var m = new System.Windows.Forms.ContextMenu();
            var mItem1 = new MenuItem("Add a new variable");
            mItem1.add_Click(ButtonEventHandler1);
            m.MenuItems.Add(mItem1);

            var currentMouseOverRow = 0;
            try
            {
                currentMouseOverRow  = dgv.HitTest(e.X,e.Y).RowIndex;
            

                if (currentMouseOverRow >= 0 && currentMouseOverRow != null)
                {
                    toDelete = currentMouseOverRow;
                    var s = dgv.Rows[(currentMouseOverRow)].Cells[0].Value;
                    var mItem2 = new MenuItem("Remove '" + s + "'")
                    m.MenuItems.Add(mItem2);
                    mItem2.add_Click(DeleteHandler1);
                }

                var hti = dgv.HitTest(e.X, e.Y);
                dgv.ClearSelection();
                dgv.Rows[hti.RowIndex].Selected = true;

            }
            catch (err){}
            
            m.Show(dgv, new Point(e.X, e.Y));
        }
    }
}

class Command1
{        
    var txt1 = 0;
    var txt2 = 0;
    var txt3;
    var type = 0;
    
    function CreateVar()
    {
        var out = "@echo off\n\"" + txt2 + "\" " + txt3 + " %*"
        var path = "c:\\Cmds\\" + txt1 + "." + type;
        
        try
        {
            
            if(txt1 == 0 || txt2 == 0 || type == 0)
            {
                 MessageBox.Show("You must fill out the following:\n\tname\n\tpath\n\ttype"); 
            }
            else if (File.Exists(txt2)) 
            {
                var sw = new System.IO.StreamWriter(path, true);
                sw.WriteLine(out);
                sw.Close();
            }
            else
            {
                MessageBox.Show("Path is not valid");    
            }
            
        }
        catch(err)
        {
            MessageBox.Show("Variable has invalid parameters and could not be created");
        }
    }
    
    function SetVars(t1,t2,t3,tp)
    {
        txt1 = t1;
        txt2 = t2;
        txt3 = t3;
        type = tp;
    }
}

Application.Run(new Form1);