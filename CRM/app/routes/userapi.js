const User=require("../../model/user");

module.exports.postCreateUser= async(req,res)=>{
    const currUser = await User.findOne({email:req.body.email})
    if(currUser)
    {
        return res.json({
            success: false,
            message: 'Trùng email rồi!!!'
          });
    }
    else {
        const user=await User.create(req.body);
        return res.status(201).json(user);
    }
}
module.exports.putUpdateUser=async(req,res)=>{
    const user=req.body;
    const result=await User.findByIdAndUpdate(
        {_id:req.params._id},
        user,
        {
            new:true,
        }

    )
    res.status(200).json(result);
}
module.exports.getAllUser=async(req,res)=>{
    const user=await User.find({});
    res.json(user);
}
module.exports.getUser=async(req,res)=>{
    const id=req.params._id;
    const user=await User.findById(id);
    res.json(user);
}
module.exports.getUserbyName=async(req,res)=>{
    const name=req.params._name;
    const user=await User.find({name:  { "$regex": name, "$options": "i" }});
    res.json(user);
}
module.exports.postDelUser=async(req,res)=>{
    let {_id}=req.body;
    console.log(_id)
    const user=await User.findByIdAndDelete(_id)
    if(user) return res.json("xoa thanh cong")
    else return res.json("xoa that bai")
}
module.exports.deleteUser=async(req,res)=>{
    const id=req.params._id;
    const result= await User.findByIdAndDelete(
        {_id:id}
    )
    if(result) return res.josn("xoa thanh cong")
    else return res.json("xoa that bai")
}