/**
 * 通过生成DOM节点来复制内容至剪贴板
 * @param copyCont
 */
export function copy(copyCont) {
	let oInput = document.createElement('input')
	oInput.value = copyCont
	document.body.appendChild(oInput)
	oInput.select()
	document.execCommand('Copy')
	oInput.remove()
}