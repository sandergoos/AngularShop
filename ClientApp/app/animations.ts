import { trigger, style, animate, transition, state, keyframes } from '@angular/animations';

export const fade = trigger(
    'fade',
    [
        transition(
            ':enter',
            [
                style({ opacity: 0 }),
                animate('200ms', style({ 'opacity': 1 }))
            ]
        ),
        transition(
            ':leave',
            [
                style({ 'opacity': 1 }),
                animate('200ms', style({ 'opacity': 0 }))
            ]
        )
    ]
);

export const flyInOut = trigger('flyInOut', [
    state('in', style({ transform: 'translateX(0)' })),
    transition('void => *', [
        animate(400, keyframes([
            style({ opacity: 0, transform: 'translateX(-100%)', offset: 0 }),
            style({ opacity: 1, transform: 'translateX(15px)', offset: 0.3 }),
            style({ opacity: 1, transform: 'translateX(0)', offset: 1.0 })
        ]))
    ]),
    transition('* => void', [
        animate(400, keyframes([
            style({ opacity: 1, transform: 'translateX(0)', offset: 0 }),
            style({ opacity: 1, transform: 'translateX(-15px)', offset: 0.7 }),
            style({ opacity: 0, transform: 'translateX(100%)', offset: 1.0 })
        ]))
    ])
])