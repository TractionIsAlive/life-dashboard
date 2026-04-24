# Life Dashboard

A gamified productivity web app designed to reinforce daily task completion through a reward system (XP, levels, and progress tracking).

## Concept

This project explores how simple game mechanics (XP, leveling) can improve consistency and motivation in everyday task management.

## Features

- Task management system
- XP-based reward system
- Level progression logic
- Progress bar visualization
- Persistent storage using localStorage

## System Design

- Each task contains its own XP value
- XP contributes to level progression (every 50 XP = level up)
- UI updates dynamically based on state changes
- Data persists across sessions using browser storage

## Tech Stack

- HTML
- CSS
- Vanilla JavaScript

## Future Improvements

- Streak tracking system
- Task difficulty levels (easy/medium/hard)
- Achievement badges
- Desktop widget version (Electron)

## What I Learned

- State management without frameworks
- DOM manipulation and event handling
- Structuring logic for scalability
- Building a feedback-driven UI system