import { NextRequest, NextResponse } from "next/server";

export function GET() {
	return NextResponse.json([
		{ id: 1, name: "Tipu" },
		{ id: 2, name: "Sultan" },
	]);
}

export async function POST(request: NextRequest) {
	const body = await request.json();
	if (!body.name)
		return NextResponse.json(
			{ error: "Name is required" },
			{ status: 400 },
		);
	else return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}
