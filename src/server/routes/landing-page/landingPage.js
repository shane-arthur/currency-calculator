import { API_MAPPINGS } from '../../../constants/other-constants/ApiMappings'

export default function (app) {
    app.get(API_MAPPINGS.LANDING_PAGE, (req, res) => {
        let statusCode = 200;
        const data = { shane : 'cool'};
        res.status(statusCode).send(data);
    });
}
