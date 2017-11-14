// This code is originally from http://buildnewgames.com/astar/ 
// The code was edited to fit our project.


// grid is a 2d array
// pathStart and pathEnd are arrays like [5,10]
function findPath(grid, pathStart, pathEnd)
{
  // shortcuts for speed
	var	abs = Math.abs;
	var	max = Math.max;
	var	pow = Math.pow;
	var	sqrt = Math.sqrt;

	if(!grid) return;
	// keep track of the grid dimensions
	// Note that this A-star implementation expects the grid array to be square: 
	// it must have equal height and width. If your game grid is rectangular, 
	// just fill the array with dummy values to pad the empty space.
	var gridWidth = grid[0].length;
	var gridHeight = grid.length;
	var gridSize =	gridWidth * gridHeight;


    function ManhattanDistance(Point, Goal)
    {	// linear movement - no diagonals - just cardinal directions (NSEW)
        return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
    }
    
    function Neighbours(x, y)
    {
        var	N = y - 1,
        S = y + 1,
        E = x + 1,
		W = x - 1,
        myN = N > -1 && canWalkHere(x, N, 'vertical'),
        myS = S < gridHeight && canWalkHere(x, S, 'vertical'),
        myE = E < gridWidth && canWalkHere(E, y, 'horizontal'),
        myW = W > -1 && canWalkHere(W, y, 'horizontal'),
        result = [];
        if(myN)
        result.push({x:x, y:N});
        if(myE)
        result.push({x:E, y:y});
        if(myS)
        result.push({x:x, y:S});
        if(myW)
        result.push({x:W, y:y});
        findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
        return result;
    }
    // returns boolean value (grid cell is available and open)
    function canWalkHere(x, y, direction)
    {
        return ((grid[x] != null) &&
            (grid[x][y] != null) &&
            (grid[x][y].IsDug(direction)));
	}
	
	// which heuristic should we use?
	// default: no diagonals (Manhattan)
	var distanceFunction = ManhattanDistance;
	var findNeighbours = function(){}; // empty

    // Node function, returns a new object with Node properties
	// Used in the calculatePath function to store route costs, etc.
	function Node(Parent, Point)
	{
		var newNode = {
			// pointer to another Node object
			Parent:Parent,
			// array index of this Node in the grid linear array
			value:Point.x + (Point.y * gridWidth),
			// the location coordinates of this Node
			x:Point.x,
			y:Point.y,
			// the distanceFunction cost to get
			// TO this Node from the START
			f:0,
			// the distanceFunction cost to get
			// from this Node to the GOAL
			g:0
		};

		return newNode;
	}

	// Path function, executes AStar algorithm operations
	function calculatePath()
	{
		// create Nodes from the Start and End x,y coordinates
		var	mypathStart = Node(null, {x:pathStart[0], y:pathStart[1]});
		var mypathEnd = Node(null, {x:pathEnd[0], y:pathEnd[1]});
		// create an array that will contain all grid cells
		var AStar = new Array(gridSize);
		// list of currently open Nodes
		var Open = [mypathStart];
		// list of closed Nodes
		var Closed = [];
		// list of the final output array
		var result = [];
		// reference to a Node (that is nearby)
		var myNeighbours;
		// reference to a Node (that we are considering now)
		var myNode;
		// reference to a Node (that starts a path in question)
		var myPath;
		// temp integer variables used in the calculations
		var length, max, min, i, j;
		// iterate through the open list until none are left
		while(length = Open.length)
		{
			max = gridSize;
			min = -1;
			for(i = 0; i < length; i++)
			{
				if(Open[i].f < max)
				{
					max = Open[i].f;
					min = i;
				}
			}
			// grab the next node and remove it from Open array
			myNode = Open.splice(min, 1)[0];
			// is it the destination node?
			if(myNode.value === mypathEnd.value)
			{
				myPath = Closed[Closed.push(myNode) - 1];
				do
				{
					result.push([myPath.x, myPath.y]);
				}
				while (myPath = myPath.Parent);
				// clear the working arrays
				AStar = Closed = Open = [];
				// we want to return start to finish
				result.reverse();
			}
			else // not the destination
			{
				// find which nearby nodes are walkable
				myNeighbours = Neighbours(myNode.x, myNode.y);
				// test each one that hasn't been tried already
				for(i = 0, j = myNeighbours.length; i < j; i++)
				{
					myPath = Node(myNode, myNeighbours[i]);
					if (!AStar[myPath.value])
					{
						// estimated cost of this particular route so far
						myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
						// estimated cost of entire guessed route to the destination
						myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
						// remember this new path for testing above
						Open.push(myPath);
						// mark this node in the grid graph as visited
						AStar[myPath.value] = true;
					}
				}
				// remember this route as having no more untested options
				Closed.push(myNode);
			}
		} // keep iterating until until the Open list is empty
		return result;
    }

    return calculatePath();
}