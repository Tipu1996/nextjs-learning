import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";
import prisma from "../../../../prisma/client";

interface Props {
	params: { id: string };
}

export async function GET(request: NextRequest, { params }: Props) {
	const user = await prisma.user.findUnique({
		where: { id: parseInt(params.id) },
	});
	if (!user)
		return NextResponse.json({ error: "user not found" }, { status: 404 });
	else {
		return NextResponse.json(user);
	}
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
	if (!id) {
		return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
	}

	const body = await request.json();

	const validation = schema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.errors, { status: 400 });

	const user = await prisma.user.findUnique({ where: { id: parseInt(id) } });
	if (!user)
		return NextResponse.json({ error: "user not found" }, { status: 404 });
	else {
		const updatedUser = await prisma.user.update({
			where: { id: user.id },
			data: { name: body.name, email: body.email },
		});
		return NextResponse.json(updatedUser);
	}
}

export async function DELETE(request: NextRequest, { params }: Props) {
	const user = await prisma.user.findUnique({
		where: { id: parseInt(params.id) },
	});
	if (!user)
		return NextResponse.json({ error: "user not found" }, { status: 404 });
	else {
		const deletedUser = await prisma.user.delete({
			where: { id: parseInt(params.id) },
		});
		return NextResponse.json(deletedUser);
	}
}
