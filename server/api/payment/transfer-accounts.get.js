const FALLBACK_ACCOUNTS = [
  {
    bank_code: 'BCA',
    bank_name: 'BCA',
    account_number: '1234567890',
    account_holder: 'MentorKita Digital',
    note: null,
  },
  {
    bank_code: 'BNI',
    bank_name: 'BNI',
    account_number: '9876543210',
    account_holder: 'MentorKita Digital',
    note: null,
  },
  {
    bank_code: 'MANDIRI',
    bank_name: 'Mandiri',
    account_number: '1112223334',
    account_holder: 'MentorKita Digital',
    note: null,
  },
]

export default defineEventHandler(async (event) => {
  try {
    const res = await getQrisAccounts(event)
    const accounts = res?.qris_accounts || []
    const transfer = accounts.flatMap((account) => account.transfer_accounts || [])

    return {
      status: 'success',
      mode: res?.qris_mode || null,
      data: transfer.length ? transfer : FALLBACK_ACCOUNTS,
    }
  } catch (error) {
    return {
      status: 'success',
      mode: null,
      fallback: true,
      data: FALLBACK_ACCOUNTS,
    }
  }
})
