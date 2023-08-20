import {descDFS, descDijkstras, descAStar, descBFS, descBestFirstSearch, descBiBFS} from '../../../utils/descriptions'



type descDict = Record<string, string[]>;


const matrixDescriptions: descDict = {
 'DFS': descDFS,
 "Dijkstra's Algorithim": descDijkstras,
 'A*':descAStar,
 'BFS': descBFS,
 'Best First Search': descBestFirstSearch,
 'Bidirectional BFS':descBiBFS
}

export default matrixDescriptions;