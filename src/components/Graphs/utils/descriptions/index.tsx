
type descDict = Record<string, string>;

const matrixDescriptions: descDict = {
 'DFS':"Depth-First Search (DFS): This is a graph traversal algorithm that explores as far as possible along each branch before backtracking. It is often implemented using a stack data structure, and is useful for solving problems such as finding connected components and detecting cycles in a graph.",
 "Dijkstra's Algorithim":"Dijkstra's Algorithm: This is a shortest path algorithm that finds the shortest path between nodes in a weighted graph. It works by maintaining a list of nodes to visit, and iteratively selecting the node with the smallest known distance from the starting node until the destination node is reached.",
 'A*':"A* Algorithm: This is another shortest path algorithm that is commonly used in pathfinding problems. It combines elements of both uniform cost search and greedy best-first search to find the shortest path between nodes in a weighted graph. It uses a heuristic function to guide the search towards the goal node and avoid exploring unnecessary paths.",
 'BFS':"Breadth-First Search (BFS): This is a graph traversal algorithm that explores all the vertices of a graph in breadth-first order, i.e., it visits all the vertices at the same level before moving on to the next level. It is often implemented using a queue data structure, and is useful for solving problems such as finding the shortest path between two nodes in an unweighted graph and detecting whether a graph is bipartite."
}

export default matrixDescriptions;