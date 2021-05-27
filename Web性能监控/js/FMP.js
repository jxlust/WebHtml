class FMP {
	/**
	 * get first-meaningful-paint
	 */
	static getFmp(observeTime = 3000) {
		if (!Promise ||
			!window.performance ||
			!window.performance.timing ||
			!window.requestAnimationFrame ||
			!window.MutationObserver) {
			console.log('fmp can not be retrieved');
			Promise.reject(new Error('fmp can not be retrieved'));
		}

		const promise = new Promise((resolve) => {
			const observedPoints = [];
			//mutationsList 可能存11个进入微任务队列？
			const observer = new window.MutationObserver((mutationsList, observer) => {
				console.log('ob callback:', mutationsList);
				console.log('ob :', observer);
				const innerHeight = window.innerHeight;

				function getDomMark(dom, level) {
					const length = dom.children ? dom.children.length : 0;
					let sum = 0;
					const tagName = dom.tagName;
					if (tagName !== 'SCRIPT' && tagName !== 'STYLE' && tagName !== 'META' && tagName !== 'HEAD') {
						if (dom.getBoundingClientRect && dom.getBoundingClientRect().top < innerHeight) {
							sum += (level * length);
						}
						if (length > 0) {
							const children = dom.children;
							for (let i = 0; i < length; i++) {
								sum += getDomMark(children[i], level + 1);
							}
						}
					}
					return sum;
				}
				window.requestAnimationFrame(() => {
					console.log('raf');
					const timing = window.performance.timing;
					const startTime = timing.navigationStart || timing.fetchStart;
					const t = Date.now() - startTime;
					const score = getDomMark(document, 1);
					observedPoints.push({
						score,
						t,
					});
				});
			});
			observer.observe(document, {
				childList: true,
				subtree: true,
			});

			setTimeout(() => {
				observer.disconnect();
				const rates = [];
				console.log('observedPoints:', observedPoints);
				// rates.push({
				// 	t: observedPoints[0].t,
				// 	rate: observedPoints[0].score
				// })
				for (let i = 1; i < observedPoints.length; i++) {
					if (observedPoints[i].t !== observedPoints[i - 1].t) {
						rates.push({
							t: observedPoints[i].t,
							rate: observedPoints[i].score - observedPoints[i - 1].score,
						});
					}
				}
				rates.sort((a, b) => b.rate - a.rate);
				if (rates.length > 0) {
					resolve(rates[0].t);
				} else {
					resolve(observeTime);
				}
			}, observeTime);
		});
		return promise;
	}
}
export default FMP;
