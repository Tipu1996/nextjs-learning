import { NextRequest, NextResponse } from "next/server";

interface Props {
	params: { id: number; name: string };
}

export function get({ params: { id } }: Props) {
	if (id > 10)
		return NextResponse.json({ error: "user not found" }, { status: 404 });
	else return NextResponse.json({ id: 1, name: "Tipu" });
}

export function PUT(request: NextRequest, { params: { id, name } }: Props) {}
