import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/admin';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const { data, error } = await supabaseAdmin
      .from('orders')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, source: 'supabase', data: data || [] });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to fetch admin orders' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    if (!body || typeof body !== 'object' || Array.isArray(body)) {
      return NextResponse.json({ success: false, error: 'Invalid order update' }, { status: 400 });
    }

    const id = body.id || body.orderId;

    if (!id) {
      return NextResponse.json({ success: false, error: 'Order ID is required' }, { status: 400 });
    }

    const updates: any = {
      updated_at: new Date().toISOString(),
    };

    if (body.orderStatus || body.order_status) {
      updates.order_status = body.orderStatus || body.order_status;
    }
    if (body.paymentStatus || body.payment_status) {
      updates.payment_status = body.paymentStatus || body.payment_status;
    }
    if (body.notes !== undefined) {
      updates.notes = body.notes;
    }

    const trackingUrl = body.trackingUrl !== undefined ? body.trackingUrl : body.tracking_url;
    if (trackingUrl !== undefined) {
      if (trackingUrl !== null && typeof trackingUrl !== 'string') {
        return NextResponse.json({ success: false, error: 'Tracking URL must be text' }, { status: 400 });
      }

      const trimmedTrackingUrl = typeof trackingUrl === 'string' ? trackingUrl.trim() : '';
      if (trimmedTrackingUrl.length > 2048) {
        return NextResponse.json({ success: false, error: 'Tracking URL is too long' }, { status: 400 });
      }
      if (trimmedTrackingUrl) {
        try {
          const parsedTrackingUrl = new URL(trimmedTrackingUrl);
          if (parsedTrackingUrl.protocol !== 'http:' && parsedTrackingUrl.protocol !== 'https:') {
            return NextResponse.json(
              { success: false, error: 'Tracking URL must use HTTP or HTTPS' },
              { status: 400 }
            );
          }
        } catch {
          return NextResponse.json({ success: false, error: 'Enter a valid tracking URL' }, { status: 400 });
        }
      }
      updates.tracking_url = trimmedTrackingUrl || null;
    }

    const shippingPartner =
      body.shippingPartner !== undefined ? body.shippingPartner : body.shipping_partner;
    if (shippingPartner !== undefined) {
      if (shippingPartner !== null && typeof shippingPartner !== 'string') {
        return NextResponse.json({ success: false, error: 'Shipping partner must be text' }, { status: 400 });
      }

      const trimmedShippingPartner = typeof shippingPartner === 'string' ? shippingPartner.trim() : '';
      if (trimmedShippingPartner.length > 120) {
        return NextResponse.json({ success: false, error: 'Shipping partner name is too long' }, { status: 400 });
      }
      updates.shipping_partner = trimmedShippingPartner || null;
    }

    const { data, error } = await supabaseAdmin
      .from('orders')
      .update(updates)
      .or(`id.eq.${id},order_number.eq.${id}`)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: `Order ${data.order_number || id} updated successfully`,
      data,
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to update order' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ success: false, error: 'Order ID is required' }, { status: 400 });
    }

    const { error } = await supabaseAdmin.from('orders').delete().or(`id.eq.${id},order_number.eq.${id}`);

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      message: 'Order deleted successfully from database',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, error: err?.message || 'Failed to delete order' },
      { status: 500 }
    );
  }
}
