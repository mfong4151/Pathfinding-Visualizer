
type descDict = Record<string, string[]>;

const descDFS = [
    "Depth-First Search (DFS): This is a graph traversal algorithm that explores as far as possible along each branch before exploring another route.",
    "It is often implemented using a stack data structure, and is useful for solving problems such as finding connected components and detecting cycles in a graph.",
    "This is the go to algorithm on Leetcode"

]

const descDijkstras:string[] = ["Dijkstra's Algorithm: This is a shortest path algorithm that finds the shortest path between nodes in a weighted graph. It works by maintaining a list of nodes to visit, and iteratively selecting the node with the smallest known distance from the starting node until the destination node is reached."];

const descAStar: string[] = ["A* Algorithm: This is another shortest path algorithm that is commonly used in pathfinding problems. It combines elements of both uniform cost search and greedy best-first search to find the shortest path between nodes in a weighted graph. It uses a heuristic function to guide the search towards the goal node and avoid exploring unnecessary paths.",]

const descBFS: string[] = ["Breadth-First Search (BFS): This is a graph traversal algorithm that explores all the vertices of a graph in breadth-first order, i.e., it visits all the vertices at the same level before moving on to the next level. It is often implemented using a queue data structure, and is useful for solving problems such as finding the shortest path between two nodes in an unweighted graph and detecting whether a graph is bipartite."]
const descBestFirstSearch:string[] = ["Now we get to our first heuristic based search: Best First Search.",
                                    "The idea of Best First Search is to take try and take the next closest tile to the end goal. Emphasis on try. Sometimes Best First Search will have to engage in a process of trail and error before reaching its goal.",
                                    "That is to say that Best First Search is a greedy algorithm",
                                    "Best First Search is often implemented with a min-heap as opposed to DFS's and BFS's stacks and queues, by heaping the closest tile first, we can give our best guess and where the next best position is is."
                                    ]

const descBiBFS: string[] = []
const matrixDescriptions: descDict = {
 'DFS': descDFS,
 "Dijkstra's Algorithim": descDijkstras,
 'A*':descAStar,
 'BFS': descBFS,
 'Best First Search': descBestFirstSearch,
 'Bidirectional BFS':descBiBFS
}

export default matrixDescriptions;