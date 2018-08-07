//@flow

import type { AstNode, RelevantNode, RelevantLeafNode, RelevantBranchNode } from '../../types'

const nodeWeights = {
  heading: 2,
  emphasis: 2,
  strong: 2
}

const excludedNodes = ['yaml', 'thematicBreak', 'image', 'imageReference', 'html']

export class AstSearcher {
  static buildRelevantAst(ast: AstNode, term: string): ?RelevantNode {
    const lowercaseTerm = term.toLowerCase()
    return this._toRelevantNode(ast, lowercaseTerm)
  }

  static _toRelevantNode(node: AstNode, term: string): ?RelevantNode {
    const { type } = node
    if (excludedNodes.includes(type)) {
      return null
    }
    const weight = nodeWeights[type] || 1
    if (this._isLeafNode(node)) {
      const relevance = weight * this._calculateLeafRelevance(node, term)
      if (relevance > 0.0) {
	return this._wrapRelevantLeafNode(node, relevance)
      }
      else {
	return null
      }
    } else {
      const { children } = node
      if (typeof children === 'undefined' || children === null) {
	console.warn(`Unexpected node with no children: ${node.type}`)
	return null
      }
      const relevantChildren = []
      let totalUnweightedRelevance = 0.0
      children.forEach(child => {
	const relevantChildMaybe = this._toRelevantNode(child, term)
	if (
	  typeof relevantChildMaybe !== 'undefined' &&
	  relevantChildMaybe !== null
	) {
	  relevantChildren.push(relevantChildMaybe)
	  totalUnweightedRelevance += relevantChildMaybe.relevance
	}
      })
      if (totalUnweightedRelevance > 0.0) {
	const totalRelevance = totalUnweightedRelevance * weight
	return this._wrapRelevantBranchNode(
	  node, totalRelevance, relevantChildren)
      } else {
	return null
      }
    }
  }

  static _isLeafNode(node: Object): boolean {
    const { type } = node
    return ['text', 'code', 'inlineCode'].includes(type)
  }

  static _calculateLeafRelevance(leaf: Object, term: string): number {
    const { type } = leaf
    if (type === 'text' || type === 'inlineCode') {
      const { value } = leaf
      const lowercaseValue = value.toLowerCase()
      return this._occurrences(lowercaseValue, term, false)
    } else {
      return 0.0
    }
  }

  static _wrapRelevantLeafNode(node: Object, relevance: number): RelevantLeafNode {
    return {
      type: node.type,
      relevance: relevance,
      value: node.value
    }
  }

  static _wrapRelevantBranchNode(
    node: Object,
    relevance: number,
    relevantChildren: Array<Object>
  ): RelevantBranchNode {
    return {
      type: node.type,
      relevance: relevance,
      children: relevantChildren
    }
  }

  // copied from https://stackoverflow.com/questions/4009756/how-to-count-string-occurrence-in-string
  static _occurrences(
    string: string,
    subString: string,
    allowOverlapping: boolean
  ): number {
    if (subString.length <= 0) return (string.length + 1);

    let n = 0
    let pos = 0
    const step = allowOverlapping ? 1 : subString.length;

    while (true) {
      pos = string.indexOf(subString, pos);
      if (pos >= 0) {
		++n;
	pos += step;
      } else break;
    }
    return n
  }
}
