import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";



//#region презапрос админа
const preHandler = async (req: FastifyRequest, res: FastifyReply) => {
    const access_token = `${req.headers.access_token || ""}`;
    
    // if (!checkRole) {
    //     return res
    //         .status(401)
    //         .send({ error: errorCode.AccessDenied });
    // }
    // req.headers["userId"] = result.userId;
    // req.headers["rules"] = JSON.stringify(result.rules)
};
//#endregion

//#region роутер админа
export default (
    fastify: FastifyInstance,
    opts: any,
    done: (err?: Error | undefined) => void
) => {
    //#region  авторизация
    fastify.post(
        "/login",
        {
            schema: {
            },
        },
        (req: FastifyRequest, res: FastifyReply) => {
            res.send({
                state: false
            });
        }
    );
    //#endregion 

    done();
};

//#endregion