using System;
using System.IO;
using System.Linq;

namespace day_3
{
    class Program
    {
        static void Main(string[] args)
        {
            var lines = File.ReadAllText(@"./input.txt").Split("\n");
            var treeEncounters = lines.Where((x, index) => x[(index * 3) % x.Length] == '#');


            Console.WriteLine($"Part one: {treeEncounters.Count()}");


            Console.ReadKey();
        }
    }
}
