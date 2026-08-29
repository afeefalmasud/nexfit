import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import { stripe } from '@/lib/stripe';

export async function POST(req) {
  try {
    const { classId, className, price, userId, userEmail, userRole } = await req.json();

    if (userRole === 'trainer') {
      return NextResponse.json(
        { error: 'Trainers are not allowed to purchase courses.' },
        { status: 403 }
      );
    }

    const headersList = await headers();
    const origin = headersList.get('origin');

    const session = await stripe.checkout.sessions.create({
      customer_email: userEmail,
      managed_payments: { enabled: false },
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: className || 'NexFit Class Session',
            },
            unit_amount: Math.round(parseFloat(price) * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      // Pass all metadata into success URL parameters so client can extract it
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}&userId=${userId}&classId=${classId}&className=${encodeURIComponent(className)}&price=${price}`,
      cancel_url: `${origin}/classes/${classId}?payment=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}