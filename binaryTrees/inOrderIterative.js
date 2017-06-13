/*
Given a Binary Tree, write a in order traversal iterative class,
that takes in a root of a binary tree at instantiation.

Inorder Iterative should have the following methods:

hasNext: returns a boolean if there is a next node/value to return.
getNext: return the next node/value.

        5
       /  \
      2    7
          /   \
        4       8
                  \
                    9
*/

class InorderIterative {
  constructor(root) {
    this.stack = [];
    this.currentNode = root;
  }
  hasNext(){
    if (this.stack.length === 0 && this.currentNode === null) {
      return false;
    } else {
      return true;
    }
  }
  getNext() {
    while( this.currentNode !== null ) {
      this.stack.push(this.currentNode);
      this.currentNode = this.currentNode.leftChild;
    }
    if (this.hasNext() === false) {
      return;
    } else {
      let node = this.stack.pop();
      this.currentNode = node.rightChild;
      return node.value;
    }
  }
}

const BinaryTreeNode = require('es6datastructuresandalgorithms').BinaryTreeNode;

const newBT = new BinaryTreeNode(5);
newBT.leftChild = new BinaryTreeNode(2);
newBT.rightChild = new BinaryTreeNode(7);
newBT.rightChild.leftChild = new BinaryTreeNode(4);
newBT.rightChild.rightChild = new BinaryTreeNode(8);
newBT.rightChild.rightChild.rightChild = new BinaryTreeNode(9);

const test = new InorderIterative(newBT);

console.log(test.getNext());// 2
