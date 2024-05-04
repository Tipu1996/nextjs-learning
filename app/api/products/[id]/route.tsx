import { NextRequest, NextResponse } from "next/server";
import schema from "../schema";

interface Props {
	params: { id: number };
}

export function GET(request: NextRequest, { params }: Props) {
	if (params.id > 10)
		return NextResponse.json(
			{ error: "product not found" },
			{ status: 404 },
		);
	else return NextResponse.json({ id: 1, name: "Doritos", price: 3.49 });
}

export async function PUT(request: NextRequest, props: Props) {
	const body = await request.json();
	const validation = schema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.errors, { status: 404 });
	else if (props.params.id > 10)
		return NextResponse.json(
			{ error: "product not found" },
			{ status: 404 },
		);
	else return NextResponse.json({ id: 1, name: "Eggs", price: 2.2 });
}

export function DELETE(request: NextRequest, props: Props) {
	if (props.params.id > 10)
		return NextResponse.json(
			{ error: "product not found" },
			{ status: 404 },
		);
	else return NextResponse.json({});
}
