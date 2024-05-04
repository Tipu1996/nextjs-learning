import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

interface Props {
	params: { id: any };
}

export function GET(request: NextRequest, { params }: Props) {
	if (!params?.id) {
		return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
	}
	if (params.id > 10)
		return NextResponse.json({ error: "user not found" }, { status: 404 });
	else return NextResponse.json({ id: 1, name: "Tipu" });
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
	const body = await request.json();
	const validation = schema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.errors, { status: 400 });
	else if (id > 10)
		return NextResponse.json({ error: "user not found" }, { status: 404 });
	else return NextResponse.json({ id: 1, name: "Sultan" });
}

export function DELETE(request: NextRequest, { params }: Props) {
	if (!params?.id) {
		return NextResponse.json({ error: "Missing user ID" }, { status: 400 });
	}
	if (params.id > 10)
		return NextResponse.json({ error: "user not found" }, { status: 404 });
	else return NextResponse.json({});
}
