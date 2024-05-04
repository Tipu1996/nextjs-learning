import { NextRequest, NextResponse } from "next/server";

interface Props {
	params: { id: number };
}

export function GET({ params: { id } }: Props) {
	if (id > 10)
		return NextResponse.json({ error: "user not found" }, { status: 404 });
	else return NextResponse.json({ id: 1, name: "Tipu" });
}

export async function PUT(request: NextRequest, { params: { id } }: Props) {
	const body = await request.json();
	if (!body.name)
		return NextResponse.json(
			{ error: "Name is required" },
			{ status: 400 },
		);
	else if (id > 10)
		return NextResponse.json({ error: "user not found" }, { status: 404 });
	else return NextResponse.json({ id: 1, name: "Sultan" });
}

export async function DELETE(request: NextRequest, { params: { id } }: Props) {
	if (id > 10)
		return NextResponse.json({ error: "user not found" }, { status: 404 });
	else return NextResponse.json({});
}
