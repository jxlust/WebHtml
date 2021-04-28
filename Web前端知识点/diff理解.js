function patch(oldVnode, vnode) {
	//新老节点
	if (sameVnode(oldVnode, vnode)) {
		patchVnode(oldVnode, vnode);
	} else {
		let oldEl = oldVnode.el;
		let parentEl = api.getParentNode(oldEl);
		api.createEle(vnode) // 根据Vnode生成新元素
		if (parentEl !== null) {
			//参考Node对象的insertBefore方法,往老节点后一个元素之前插入新节点 === 往老节点之后插入一个新节点
			//DOM操作
			api.insertBefore(parentEl, vnode.el, api.getNextSibling(oldEl));
			//删除老节点
			api.removeNode(parentEl, oldEl);
			oldVnode = null;
		}
	}
	//更新完成之后oldVnode = vnode

	return vnode
}

/**
 * 函数作用：
 * 找到对应的真实dom，称为el
 * 判断Vnode和oldVnode是否指向同一个对象，如果是，那么直接return
 * 如果他们都有文本节点并且不相等，那么将el的文本节点设置为Vnode的文本节点。
 * 如果oldVnode有子节点而Vnode没有，则删除el的子节点
 * 如果oldVnode没有子节点而Vnode有，则将Vnode的子节点真实化之后添加到el
 * 如果两者都有子节点，则执行updateChildren函数比较子节点，这一步很重要
 * @param {*} oldVnode 
 * @param {*} vnode 
 * @returns 
 */
function patchVnode(oldVnode, vnode) {
	const el = vnode.el = oldVnode.el;
	let oldCh = oldVnode.children;
	let vCh = vnode.children;

	if (oldVnode === vnode) return; //对象一致，无需修改

	if (oldVnode.text !== null && vnode.text !== null && oldVnode.text !== vnode.text) {
		//文本节点
		//更新节点的新内容
		//DOM操作
		api.setContentText(el, vnode.text);
	} else {
		//node节点
		//为啥要更新？
		updateEle(el, vnode, oldVnode)
		if (oldCh && vCh && oldCh !== vCh) {
			//这一步是算法核心，更新孩子，对比孩子
			updateChildren(el,oldCh, vCh)
		} else if (vCh) {
			//新增子节点元素
			// api.createChildren(el,vCh)
			api.createEle(vnode); //根据虚拟节点生产dom元素对象HTMLElement
		} else if (oldCh) {
			//移除所有孩子
			api.removeChildren(el)
		}

	}

}

// diff 算法的本质是找出两个对象之间的差异
// diff 算法的核心是子节点数组对比,思路是通过 首尾两端对比
// key 的作用 主要是
// 决定节点是否可以复用
// 建立key-index的索引,主要是替代遍历，提升性能
// [a,b,c,d]
// [e,f,g,d]

// oldS - oldE
// newS - newE

//2 * 2对比，四种逻辑
//1. oldS newS，旧首和新首对比，如果相同，指针都++
//2. oldE newE, 旧尾和新尾对比，如果相同，指针都--
//3. oldS newE, 旧首和新尾对比，如果相同，将旧首移动到 最后面
//4. oldE newS, 旧尾和新首对比，如果相同，将旧尾移动到 最前面

function updateChildren(parentEl,oldCh, vCh) {
	...
	if(sameVnode(oldSNode,newSNode)){
		//继续递归判断该节点
		patchVnode(oldSNode,newSNode);
		oldSNode = oldCh[++oldS];
		newSNode = vCh[++newS];
	}

	else if(sameVnode(oldSNode,newENode)){
		patchVnode(...);
		//将旧首移动到最后面
		//DOM操作
		api.insertBefore(parentEl,oldSNode,newENode.nextSibling);
		oldSNode = oldCh[++oldS];
		newENode = vCh[--newE];
	}
	//其他同理
	...

	//若四种首尾对比情况都不满足
// 尝试 用 newCh 的第一项在 oldCh 内寻找 sameVnode,如果在 oldCh 不存在对应的 sameVnode ，则直接创建一个，存在的话则判断
	// 1. key不存在，只能遍历oldCh然后返回index,
	// 2. key存在，通过map.get(key)获取索引

	// ex: [z,b,c]
				[b,d,e,f,z,c]
	//     [b,d,e,f]

	// 在old查找b,如果之前设置过key，b.key,直接可以通过map.get, 注意，虽然设置map花费了O(n)的时间，但是只有map不存在的时候，执行了，之后不会执行，均摊时间复杂度为O（1）
	// 
	let idxInOld = ...上面的逻辑;
	if(idxInOld为空){
		// 创建新节点
		//DOM操作
		createElm
	}
	let vnodeToMove = oldCh[idxInOld]
	if(sameVnode(vnodeToMove,newSNode)){
		patchVnode(vnodeToMove, newStartVnode, insertedVnodeQueue, newCh, newStartIdx)
		oldCh[idxInOld] = undefined //删掉了old里面得
		//DOM操作
		api.insertBefore(parentEl, vnodeToMove.el, oldSNode)
	}else{
		//key相同，获取到的可能出现不同，也是直接创建新的替换掉
		//DOM操作
		createElm
	}
	newSNode = vCh[++newS]


// 符合 sameVnode，则移动 oldCh 对应的 节点
// 不符合 sameVnode ,创建新节点




//TODO:
// 1. 最后 通过 oldStartIdx > oldEndIdx ，来判断 oldCh 和 newCh 哪一个先遍历完成
// 2. oldCh 先遍历完成,则证明 newCh 还有多余节点，需要新增这些节点
// 3. newCh 先遍历完成,则证明 oldCh 还有多余节点，需要删除这些节点


}

function sameVnode(a, b) {
	return (
		a.key === b.key && // key值
		a.tag === b.tag && // 标签名
		a.isComment === b.isComment && // 是否为注释节点
		// 是否都定义了data，data包含一些具体信息，例如onclick , style
		isDef(a.data) === isDef(b.data) &&
		sameInputType(a, b) // 当标签是<input>的时候，type必须相同
	)
}