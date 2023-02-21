
export const logout = (req, res) => {
    res.clearCookie('token')
}