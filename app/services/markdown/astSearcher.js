
const nodeWeights = {
    heading: 2,
    emphasis: 2,
    strong: 2
}

export class AstSearcher {
    static buildRelevantAst(ast, terms) {
	return this._toRelevantNode(ast, terms)
    }

    static _toRelevantNode(node, terms) {
	const { type } = node
	const weight = nodeWeights[type] || 1
	if (this._isLeafNode(node)) {
	    const relevance = weight * this._calculateLeafRelevance(node, terms)
	    if (relevance > 0.0) {
		return this._wrapRelevantLeafNode(node, relevance)
	    }
	    else {
		return null
	    }
	} else {
	    const { children } = node
	    const relevantChildren = []
	    let totalUnweightedRelevance = 0.0
	    children.forEach(child => {
		const relevantChildMaybe = this._toRelevantNode(child, terms)
		if (relevantChildMaybe !== null) {
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

    static _isLeafNode(node) {
	const { type } = node
	return ['text', 'code'].includes(type)
    }

    static _calculateLeafRelevance(leaf, terms) {
	const { type } = leaf
	if (type === 'text') {
	    const { value } = leaf
	    return terms.reduce(
		(acc, term) => acc + (value.includes(term) ? 1.0 : 0.0),
		0.0
	    )
	} else {
	    return 0.0
	}
    }

    static _wrapRelevantLeafNode(node, relevance) {
	return {
	    type: node.type,
	    relevance: relevance,
	    value: node.value
	}
    }

    static _wrapRelevantBranchNode(node, relevance, relevantChildren) {
	return {
	    type: node.type,
	    relevance: relevance,
	    children: relevantChildren
	}
    }
}
