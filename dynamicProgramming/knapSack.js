/*
Knapsack Problem 0/1
Given a set of items where each item has a weight and a value.
And given a knapsack with max weight capacity, determine the maximum value that can be
placed into the knapsack without going over the capacity.

Input: An integer array of weights
           An integer array of values
           The ith item is weights[i] and values[i].
Output: Integer of maximum total value
Example
Input:
	value =  [60, 100, 120]
weight = [10, 20, 30]
capacity = 50
Output: 220

Constraints
Intermediate			Advanced
Time Complexity:			O(2N)				O(KN)
Auxiliary Space Complexity: 		O(N)				O(K)

K is the capacity of the knapsack, N is the number of items

*/
