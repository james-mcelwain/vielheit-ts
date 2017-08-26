import IReq from "../interfaces/req";
import IRes from "../interfaces/res";

export default function Protected(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
    const method = descriptor.value || function() {};

    descriptor.value = function(...args: any[]) {
        const req = <IReq> args[0];
        const res = <IRes> args[1];
        const next = args[args.length - 1];

        if (!req.user || !req.user.isAuthenticated()) {
            return res.redirect('/login', next);
        }

        return method.call(this, ...args);
    }
}