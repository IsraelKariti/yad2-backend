
export const ok = (res, msg)=>{
    res.status(200).send(msg);
}
export const created = (res, msg)=>{
    res.status(201).send(msg);
}
export const unauthorized = (res, msg)=>{
    res.status(401).send(msg);
}

export const badRequest = (res, msg)=>{
    res.status(400).send(msg);
}
export const pageNotFound = (res, msg)=>{
    res.status(404).send(msg);
}
export const serverError = (res, msg)=>{
    res.status(500).send(msg);
}
