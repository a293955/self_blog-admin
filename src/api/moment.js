import axios from '@/util/request'

export function upload(formdata) {
	return axios({
		headers: {'Content-Type': 'multipart/form-data',},// 设置传输内容的类型和编码
		withCredentials: true,// 指定某个请求应该发送凭据
		url: 'moment/upload',
		method: 'POST',
		data: {
			...formdata
		}
	})
}
export function getMomentListByQuery(queryInfo) {
	return axios({
		url: 'moments',
		method: 'GET',
		params: {
			...queryInfo
		}
	})
}

export function updatePublished(id, published) {
	return axios({
		url: 'moment/published',
		method: 'PUT',
		params: {
			id,
			published
		}
	})
}

export function getMomentById(id) {
	return axios({
		url: 'moment',
		method: 'GET',
		params: {
			id
		}
	})
}

export function deleteMomentById(id) {
	return axios({
		url: 'moment',
		method: 'DELETE',
		params: {
			id
		}
	})
}

export function saveMoment(moment) {
	return axios({
		url: 'moment',
		method: 'POST',
		data: {
			...moment
		}
	})
}

export function updateMoment(moment) {
	return axios({
		url: 'moment',
		method: 'PUT',
		data: {
			...moment
		}
	})
}