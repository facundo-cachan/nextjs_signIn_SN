import { serialize, CookieSerializeOptions } from "cookie"
import { NextApiResponse } from "next"

export const setCookie = (
  res: NextApiResponse,
  name: string,
  value: unknown,
  options: CookieSerializeOptions = {}
) => {
  const stringValue =
    typeof value === "object" ? "j:" + JSON.stringify(value) : String(value)

  if ("maxAge" in options) {
    options.expires = new Date(Date.now() + options?.maxAge)
    option.maxAge /= 1000
  }

  res.setHeader("Set-Cookie", serialize(name, stringValue, options))
}

export const setLocalStorage = (key: string, value: any) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    return e
  }
}

export const getLocalStorage = (key: string) => {
  try {
    const storage = window.localStorage.getItem(key)
    return storage ? JSON.parse(storage) : null
  } catch (e) {
    return null
  }
}

export const removeLocalStorage = (key: string) => {
  try {
    window.localStorage.removeItem(key)
    return true
  } catch (e) {
    return false
  }
}

export const setSessionStorage = (key: string, value: any) => {
  try {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  } catch (e) {
    return e
  }
}

export const getSessionStorage = (key: string) => {
  try {
    const storage = window.sessionStorage.getItem(key)
    return storage ? JSON.parse(storage) : null
  } catch (e) {
    return null
  }
}

export const removeSessionStorage = (key: string) => {
  try {
    window.sessionStorage.removeItem(key)
    return true
  } catch (e) {
    return false
  }
}
