export interface ScheduleItem{
    week_day: number
    from: number
    to: number,
    id: number
}

export interface Teacher{
    avatar: string
    bio: string
    cost: number
    id: number
    name: string
    subject: string
    user_id?: number
    whatsapp: string
    schedule: ScheduleItem[]
}