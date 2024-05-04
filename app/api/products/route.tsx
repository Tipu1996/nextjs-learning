import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";

export function GET() {
	return NextResponse.json([
		{
			id: 1,
			name: "Milk",
			price: "2.99",
		},
		{
			id: 2,
			name: "Butter",
			price: "4.99",
		},
	]);
}

export async function POST(request: NextRequest) {
	const body = await request.json();
	const validation = schema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.errors, { status: 400 });
	else return NextResponse.json({ id: 1, name: body.name }, { status: 201 });
}
