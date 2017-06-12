/*
Lowest Common Ancestor
Given the root node of a binary tree and two distinct values, find the lowest common ancestor.

Input:   Root Node, Two Integer Values
Output:  Integer Value of Lowest Common Ancestor
Example
         5
        /  \
       2    7
          /   \
        4       8
                  \
                    9

  Input: root, 4, 9
  Output: 7

Constraints
Time Complexity: O(N)
Auxiliary Space Complexity: O(N)

Integer values of nodes are all distinct.
*/

function lowestCommonAncestor(root, val1, val2) {
  let node1 = findNode(root, val1);
  let node2 = findNode(root, val2);
  return findLowestCommonAncestor(root, node1, node2);
}

function findLowestCommonAncestor(root, node1, node2) {
  if (root === null || root === node1 || root === node2) return root;

  let left = findLowestCommonAncestor(root.leftChild, node1, node2);
  let right = findLowestCommonAncestor(root.rightChild, node1, node2);

  if (left !== null && right !== null) {
    return root.value;
  } else {
    return left || right;
  }
}

function findNode(node, target) {
  if (node === null) {
    return null;
  } else {
    if (node.value === target) {
      return node;
    } else {
      let found = findNode(node.leftChild, target);
      if (found === null) {
        found = findNode(node.rightChild, target);
      }
      return found;
    }
  }
}

/*
Solution
Perform a tree traversal to find/collect the path to the first node.
Place values of the path into an array (e.g., [5, 7, 4])
Perform a t	ree traversal to find/collect the path to the second node.
Place values of the path into second array (e.g., [5, 7, 8, 9])
Iterate through both path arrays and compare the values.
Return the last matching value. (e.g., return 7)
*/

/******************************TEST******************************/
const BinaryTreeNode = require('es6datastructuresandalgorithms').BinaryTreeNode;
const stringify = require('es6datastructuresandalgorithms').stringify;

const newBT = new BinaryTreeNode(5);
newBT.leftChild = new BinaryTreeNode(2);
newBT.rightChild = new BinaryTreeNode(7);
newBT.rightChild.leftChild = new BinaryTreeNode(4);
newBT.rightChild.rightChild = new BinaryTreeNode(8);
newBT.rightChild.rightChild.rightChild = new BinaryTreeNode(9);

console.log('answer should be 7:', lowestCommonAncestor(newBT, 4, 9) === 7);
