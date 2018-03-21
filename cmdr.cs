using System;
using System.Windows.Forms;
using System.IO;

namespace CmdrApplication
{
    class CmdrTester
    {
        static void Main(string[] args)
        {
            CmdrForm cmdr = new CmdrForm();
            cmdr.ShowDialog();
        }
    }

    class CmdrForm : Form
    {
        MenuStrip ms = new MenuStrip();
        ToolStripItem mItem1 = new ToolStripButton();
        OpenFileDialog openFile = new OpenFileDialog();

        public CmdrForm()
        {
            this.Text = "Manage Commands";
            //set the form style to a dialog box
            this.FormBorderStyle = FormBorderStyle.FixedDialog;
            //remove the maximize box
            this.MaximizeBox = false;
            //remove the minimize box
            this.MinimizeBox = false;
            setMenu();
            setFileDialog();
        }

        private void setMenu()
        {
            mItem1.Text = "\u2795";

            ms.Items.Add(mItem1);
            
            this.Controls.Add(ms);
            // Dock the MenuStrip to the top of the form.
            ms.Dock = DockStyle.Top;

            ms.ShowItemToolTips = true;
            mItem1.ToolTipText = "Add new command";
            mItem1.Click += new System.EventHandler(this.mItem1_Click);
        }

        private void mItem1_Click(object sender, EventArgs e)
        {
            OpenFileDialog openFileDialog1 = new OpenFileDialog();
            openFileDialog1.InitialDirectory = "c:\\";
            openFileDialog1.Filter = "txt files (*.txt)|*.txt|All files (*.*)|*.*";
            openFileDialog1.FilterIndex = 2;
            openFileDialog1.RestoreDirectory = true;

            openFileDialog1.ShowDialog();
        }

        private void setFileDialog()
        {
            openFile.InitialDirectory = "c:\\";
            openFile.Filter = "exe files (*.exe)|*.exe";
            openFile.FilterIndex = 2;
            openFile.RestoreDirectory = true;
        }
    }
}

