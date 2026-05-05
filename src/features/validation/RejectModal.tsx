import { useState } from 'react'
import { X } from 'lucide-react'
import { Modal } from '#/components/ui/Modal'

type Props = {
  open: boolean
  onClose: () => void
  onConfirm: (reason: string) => void
  code: string
}

export function RejectModal({ open, onClose, onConfirm, code }: Props) {
  const [reason, setReason] = useState('')
  const valid = reason.trim().length >= 5

  function submit() {
    if (!valid) return
    onConfirm(reason.trim())
    setReason('')
  }

  return (
    <Modal
      open={open}
      onClose={onClose}
      eyebrow={`Refus · ${code}`}
      title="Motif du refus"
      width={520}
      footer={
        <div className="flex justify-between gap-2">
          <button onClick={onClose} className="btn">Annuler</button>
          <button onClick={submit} className="btn btn-danger" disabled={!valid}>
            <X className="h-4 w-4" /> Confirmer le refus
          </button>
        </div>
      }
    >
      <div className="flex flex-col gap-3">
        <p className="m-0 text-[13.5px] leading-7 text-[var(--text-soft)]">
          Tout refus est tracé dans l'historique d'audit. Donnez une raison claire — au moins 5 caractères — pour
          permettre au demandeur de reformuler ou corriger sa requête.
        </p>
        <label className="block">
          <span className="label">Motif</span>
          <textarea
            autoFocus
            className="field mt-1.5 min-h-[120px] resize-y"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Ex. Marge cible insuffisante, retravailler le devis avant de représenter."
          />
          <span className="font-tech mt-1 inline-block text-[11px] uppercase tracking-[0.18em] text-[var(--text-faint)]">
            {reason.trim().length} caractères
          </span>
        </label>
      </div>
    </Modal>
  )
}
