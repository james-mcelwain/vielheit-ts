import IReq from "../interfaces/req";
import IRes from "../interfaces/res";

export default function Protected(target: any, propertyKey: string, descriptor: TypedPropertyDescriptor<Function>) {
    const method = descriptor.value;

    descriptor.value = function(...args: any[]) {
        const req = <IReq> args[0];
        const res = <IRes> args[1];
        const next = args[args.length - 1];

        if (!req.user || !req.user.isAuthenticated()) {
            res.header('CLEAR-SESSION', true);
            return res.redirect('/login', next);
        }

        return method.call(this, ...args);
    }
}