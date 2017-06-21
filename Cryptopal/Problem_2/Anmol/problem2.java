import java.util.*;
import java.io.*;

class problem2
{
   public static void main(String[] args)throws IOException
    {
        InputStreamReader ir = new InputStreamReader(System.in);
		BufferedReader br = new BufferedReader(ir);
        while(true)
        {
            System.out.println("Enter first string");
            String in1= br.readLine();

            System.out.println("Enter second string");
            String in2 = br.readLine();

            

            if(in1.length()!=in2.length())
            {
                System.out.println("Enter strings of equal length");
                continue;
            }

            int l = in1.length();
            char[] out = new char[l];

            for(int i =0;i<l;i++)
            {
                char c1= in1.charAt(i);
                char c2= in2.charAt(i);

                if(!((c1>='a'&&c1<='f'||c1>='0'&&c1<='9')&&(c2>='a'&&c2<='f'||c2>='0'&&c2<='9')))
                {
                    System.out.println("Enter valid string");
                    break;
                }
                else
                {   int d1;
                    int d2;


                    if(Character.isDigit(c1))
                    d1 = c1-48;
                    else
                    d1= 10+c1-97;

                    if(Character.isDigit(c2))
                    d2 = c2-48;
                    else
                    d2= 10+c2-97;

                    int o = d1^d2;

                    if(o<10)
                    out[i]=(char)(o+48);
                    else
                    out[i]=(char)(o-10+97);

                }
            }

            for( int i=0;i<l;i++)
            {
                System.out.print(out[i]);
            }
            System.out.println();
            break;
    }
}
}