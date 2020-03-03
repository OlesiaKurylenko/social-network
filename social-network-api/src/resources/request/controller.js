import BaseResponse from "../../middleware/base-response";
import RequestService from "./service"

export default class RequestController extends BaseResponse {
    getPendingRequests = async (req, res) => {
        try {
            const { userId } = req
            const data = await RequestService.getPendingRequestsQuery(userId)
            await this.response(null, res, data)
        } catch (e) {
            await this.response(e, res, null)
        }
    }
    getIncomingRequests = async (req, res) => {
        try {
            const { userId } = req
            const data = await RequestService.getIncomingRequests(userId)
            await this.response(null, res, data)
        } catch (e) {
            await this.response(e, res, null)
        }
    }
    addRequest = async (req, res) => {
        try {
            const body = req.body;
            const data = await RequestService.addRequest(body)
            await this.response(null, res, data)
        } catch (e) {
            await this.response(e, res, null)
        }
    }
    approveRequest = async (req, res) => {
        try {
            const body = req.body;
            const data = await RequestService.approveRequestQuery(body)
            await this.response(null, res, data)
        } catch (e) {
            await this.response(e, res, null)
        }
    }
    deleteRequest = async (req, res) => {
        try {
            const body = req.body;
            const data = await RequestService.deleteRequest(body)
            await this.response(null, res, data)
        } catch (e) {
            await this.response(e, res, null)
        }
    }
}