import { notification } from 'antd'

export const notifyError = (opts) => {
    // message, description, duration
    notification.error(opts)
}

export const notifySuccess = (opts) => {
    notification.success(opts)
}

export const httpErrorHandler = (e) => {
    notifyError({
        message: `${e.response.status}: ${e.response.statusText}`,
        description: e.response.data.message
    })
}
