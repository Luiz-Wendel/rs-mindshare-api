import jwt from "jsonwebtoken"

export type JwtPayload = {
  id: string
  email: string
}

export const signJwt = (payload: JwtPayload, expiresIn?: string) => {
  const secret = process.env.JWT_SECRET as unknown as jwt.Secret

  let options: jwt.SignOptions = {}
  const expiration = expiresIn

  if (expiration) {
    options = { expiresIn: expiration as unknown as NonNullable<jwt.SignOptions['expiresIn']> }
  }

  return jwt.sign(payload, secret, options)
}

export const verifyJwt = (token: string) => {
  const secret = process.env.JWT_SECRET as unknown as jwt.Secret

  return jwt.verify(token, secret) as JwtPayload
}
