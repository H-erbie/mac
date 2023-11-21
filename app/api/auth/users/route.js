import { startDb } from "@/lib/db";
import UserModel from "@/models/userModal";
import {NextResponse} from "next/server";

export const POST = async (req) => {
  const body = await req.json();
  await startDb();
  const oldUser = await UserModel.findOne({ email: body.email });
  if (oldUser)
    return NextResponse.json(
      { error: "email is already in use" },
      { status: 422 }
    );
    const user = await UserModel.create({...body})
    return NextResponse.json({
        user: {
            id: user._id.toString(),
            email: user.email,
            name: `${user.fname} ${user.lname}`,
            phone: user.phone,
            password: user.password,
            role: user.role
        },
    })
};


export const PATCH = async (req) => {
  const body = await req.json();
  await startDb();
  const oldUser = await UserModel.findByIdAndUpdate(
    {_id: body.id},
    {lname: body.lname,
      fname: body.fname,
      email: body.email,
      password: body.password,
    phone: body.phone},
    { new: true, runValidators: true}

    )
    if (!oldUser)
    return NextResponse.json(
      { error: "id does not exist" },
      { status: 422 }
    );
    return NextResponse.json({
      user: {
          id: oldUser._id.toString(),
          email: oldUser.email,
          name: `${oldUser.fname} ${oldUser.lname}`,
          phone: oldUser.phone,
          password: oldUser.password,
          role: oldUser.role
      },
  })
}

export const DELETE = async (req) => {
  const body = await req.json();
  await startDb();
  const oldUser = await UserModel.findByIdAndDelete(    {_id: body.id}
    )
    if (!oldUser)
    return NextResponse.json(
      { error: "id does not exist" },
      { status: 422 }
    );
    return NextResponse.json({
      user: {
          email: oldUser.email,
          name: `${oldUser.fname} ${oldUser.lname}`,
          role: oldUser.role
      },
  })
}