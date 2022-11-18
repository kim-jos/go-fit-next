// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req: Request, res) {
  if (req.method == "GET") {
    res.status(200).json({ name: "Joseph Kim" });
  }
}
