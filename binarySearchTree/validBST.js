/*
Valid Binary Search Tree
Given a binary tree root node, check if the tree is a valid binary search tree.

Input: 	 Node in a Binary Tree
Output:  Boolean

Example
  Input:
          5
        /   \
       2     7
           /   \
          4     9
  Output:	 false

Constraints:
  Time Complexity: O(N)
  Auxiliary Space Complexity: O(N)

The binary tree node has the following properties:
  value : an integer
  leftChild : default null
  rightChild : default null
*/

function isValidBST(root) {
  const nodeValues = [];

  function inOrderTraverse(node) {
    if (node === null) {
      return;
    }

    inOrderTraverse(node.leftChild);
    nodeValues.push(node.value);
    inOrderTraverse(node.rightChild);
  }

  inOrderTraverse(root);

  for (let i = 1; i < nodeValues.length; i+= 1) {
    previous = nodeValues[i-1];
    current = nodeValues[i];
    if (previous >= current) return false;
  }
  return true;
}

/*
Solution
Perform an in-order depth first search and push values into an array
Check to see whether the array is sorted in ascending order
Notes:
Can be solved using recursion with side effects.
*/

//TEST:

const BinarySearchTree = require('es6datastructures').BinarySearchTree;
const newBST = new BinarySearchTree();
[5,2,7,8,9].forEach( value => newBST.insert(value));

console.log('this example should be true:', isValidBST(newBST.root));

class BinaryTreeNode {
  constructor(value) {
    this.value = value || null;
    this.leftChild = null;
    this.rightChild = null;
  }
}


const newBT = new BinaryTreeNode(5);
newBT.leftChild = new BinaryTreeNode(2);
newBT.rightChild = new BinaryTreeNode(7);
newBT.rightChild.leftChild = new BinaryTreeNode(4);
newBT.rightChild.rightChild = new BinaryTreeNode(9);

console.log('this example should be false:', isValidBST(newBT));
