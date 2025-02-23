
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.7.1'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file')
    const journalId = formData.get('journalId')

    if (!file || !journalId) {
      return new Response(
        JSON.stringify({ error: 'File and journal ID are required' }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
      )
    }

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const fileExt = file.name.split('.').pop()
    const filePath = `${journalId}/${crypto.randomUUID()}.${fileExt}`

    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('journal_attachments')
      .upload(filePath, file)

    if (uploadError) {
      console.error('Upload error:', uploadError)
      throw uploadError
    }

    const { error: dbError } = await supabase
      .from('attachments')
      .insert({
        journal_id: journalId,
        file_path: filePath,
        file_type: file.type
      })

    if (dbError) {
      console.error('Database error:', dbError)
      throw dbError
    }

    return new Response(
      JSON.stringify({ 
        message: 'File uploaded successfully',
        filePath,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )

  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})
