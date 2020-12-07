using System;
using System.IO;
using System.Linq;

namespace day_6
{
    class Program
    {
        static void Main(string[] args)
        {
            var lines = File.ReadAllText(@"./input.txt").Split("\n\n");
            var groupAnswers = lines.Select(x => x.Replace("\n", ""));
            var answer1 = groupAnswers.Select(x => x.Distinct().Count()).Sum();
            Console.WriteLine(answer1);

            var answer2 = lines.Select(str=>str.Replace("\n", "").GroupBy(c => c).Where(g=>g.Count() == str.Split("\n").Count()).Count()).Sum();
            Console.WriteLine(answer2);
            Console.ReadLine();
        }
    }
}
