using System;
using System.IO;
using System.Linq;

namespace day_3
{
    class Program
    {
        static Slope[] possibleSlopes = new Slope[]
        {
            new Slope{ Right = 1, Down = 1 },
            new Slope{ Right = 3, Down = 1 },
            new Slope{ Right = 5, Down = 1 },
            new Slope{ Right = 7, Down = 1 },
            new Slope{ Right = 1, Down = 2 },
        };
        static void Main(string[] args)
        {
            var lines = File.ReadAllText(@"./input.txt").Split("\n");

            /*PART ONE*/
            var treeEncounters = lines.Where(TreeDetectorFactory(new Slope { Right = 3, Down = 1 }));

            Console.WriteLine($"Part one: {treeEncounters.Count()}");//228

            /*PART TWO*/
            var allTreeEncounters = possibleSlopes
                .Select(slope => lines.Where(TreeDetectorFactory(slope)).Count());
            var multipliedEncounters = allTreeEncounters.Aggregate(1L, (total, next) => total * next);

            Console.WriteLine($"Part two: {multipliedEncounters}");//6818112000

            Console.ReadKey();
        }

        static Func<string, int, bool> TreeDetectorFactory(Slope currentTrajectory)
        {
            return (x, index) =>
            {
                if ((index + 1) % currentTrajectory.Down == 0)
                {
                    return x[(index * currentTrajectory.Right) % x.Length] == '#';
                }
                return false;
            };
        }
    }


    class Slope
    {
        public int Right { get; set; }
        public int Down { get; set; }
    }
}
