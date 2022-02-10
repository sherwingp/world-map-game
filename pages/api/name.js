export default (req, res) => {
    const body = req.body;
    console.log('body:', body);
    res.json({ data: `${body.name}`});
  };