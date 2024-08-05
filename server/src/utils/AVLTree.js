class AVLTreeNode {
    constructor(key, value) {
      this.key = key;
      this.value = value;
      this.height = 1;
      this.left = null;
      this.right = null;
    }
  }
  
  class AVLTree {
    constructor() {
      this.root = null;
    }
  
    // Insert a key-value pair into the AVL Tree
    insertKey(key, value) {
      this.root = this._insert(this.root, key, value);
    }
  
    _insert(node, key, value) {
      if (!node) return new AVLTreeNode(key, value);
      if (key < node.key) node.left = this._insert(node.left, key, value);
      else if (key > node.key) node.right = this._insert(node.right, key, value);
      else node.value = value;
  
      node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
      return this._balance(node);
    }
  
    _balance(node) {
      const balance = this._getBalance(node);
      if (balance > 1 && this._getBalance(node.left) >= 0) return this._rightRotate(node);
      if (balance > 1 && this._getBalance(node.left) < 0) {
        node.left = this._leftRotate(node.left);
        return this._rightRotate(node);
      }
      if (balance < -1 && this._getBalance(node.right) <= 0) return this._leftRotate(node);
      if (balance < -1 && this._getBalance(node.right) > 0) {
        node.right = this._rightRotate(node.right);
        return this._leftRotate(node);
      }
      return node;
    }
  
    _rightRotate(y) {
      const x = y.left;
      const T2 = x.right;
      x.right = y;
      y.left = T2;
      y.height = 1 + Math.max(this._getHeight(y.left), this._getHeight(y.right));
      x.height = 1 + Math.max(this._getHeight(x.left), this._getHeight(x.right));
      return x;
    }
  
    _leftRotate(x) {
      const y = x.right;
      const T2 = y.left;
      y.left = x;
      x.right = T2;
      x.height = 1 + Math.max(this._getHeight(x.left), this._getHeight(x.right));
      y.height = 1 + Math.max(this._getHeight(y.left), this._getHeight(y.right));
      return y;
    }
  
    _getHeight(node) {
      return node ? node.height : 0;
    }
  
    _getBalance(node) {
      return node ? this._getHeight(node.left) - this._getHeight(node.right) : 0;
    }
  
    getSortedValues() {
      const values = [];
      this._inOrderTraversal(this.root, values);
      return values;
    }
  
    _inOrderTraversal(node, values) {
      if (!node) return;
      this._inOrderTraversal(node.left, values);
      values.push(node.value);
      this._inOrderTraversal(node.right, values);
    }
  }
  
  module.exports = AVLTree;
  