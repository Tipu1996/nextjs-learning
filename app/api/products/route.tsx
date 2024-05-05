import { NextRequest, NextResponse } from "next/server";
import schema from "./schema";
import prisma from "../../../prisma/client";

export async function GET() {
	const products = await prisma.product.findMany();
	if (!products)
		return NextResponse.json(
			{ error: "no products found" },
			{ status: 404 },
		);
	else return NextResponse.json(products);
}

export async function POST(request: NextRequest) {
	const body = await request.json();
	const validation = schema.safeParse(body);
	if (!validation.success)
		return NextResponse.json(validation.error.errors, { status: 400 });
	const newProduct = await prisma.product.create({
		data: { name: body.name, price: body.price },
	});
	return NextResponse.json(newProduct);
}
