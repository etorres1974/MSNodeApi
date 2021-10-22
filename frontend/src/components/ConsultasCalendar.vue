<template>
  <div>
    <v-sheet
      tile
      height="54"
      class="d-flex"
    >
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.prev()"
      >
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
      <v-select
        v-model="type"
        :items="types"
        dense
        outlined
        hide-details
      ></v-select>
      <v-spacer></v-spacer>
      <v-btn
        icon
        class="ma-2"
        @click="$refs.calendar.next()"
      >
        <v-icon>mdi-chevron-right</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet height="600">
      <v-calendar
        ref="calendar"
        v-model="value"
        :weekdays="weekday"
        :type="type"
        :events="events"
        :event-overlap-mode="mode"
        :event-overlap-threshold="30"
        :event-color="getEventColor"
        @click:date="clickDate"
        @click:event="clickEvent"
        @change="getEvents"
      ></v-calendar>
    </v-sheet>
  </div>
</template>
<script>
import cache from "../services/cache"
  export default {
    data: () => ({
      type: 'month',
      types: ['month', 'week', 'day', '4day'],
      mode: 'stack',
      weekday: [0, 1, 2, 3, 4, 5, 6],
      value: '',
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1']

    }),
    computed: {
        getAgendaEvents(){
            return null //TODO cache.getAgendaEvents()
        }
    },
    methods: {
      clickDate({date}){
        console.log("CLICK DATE", date)
      },
      clickEvent({ nativeEvent, event }){
        console.log("CLICK Event native", nativeEvent)
        console.log("CLICK Event", event)
      },
      getEvents ({ start, end }) {

        const min = new Date(`${start.date}T00:00:00`)
        const max = new Date(`${end.date}T23:59:59`)
        const events = this.getAgendaEvents || this.getMockEventList(min,max)
        console.log("Agenda Min  ", min)
        console.log("Agenda Max ", max)
        this.events = events.filter(e=> e.start >= min &&  e.end <= max)
      },
      event(name, start, end){
          return {
            name,
            start,
            end,
            color: this.randomColor(),
            timed: true,
          }
      },
      getMockEventList(min , max){
        const events = []
        for (let i = 0; i < 5; i++) {
          events.push(this.mockEvent(min,max))
        }
        console.log("Mock events ", events )
        return events
      },
      mockEvent(min, max){
          const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          const secondTimestamp = this.rnd(2, 8) * 900000
          const second = new Date(first.getTime() + secondTimestamp)
          return this.event( "Mock", first, second)
          
      },
      randomColor(){
          return this.colors[this.rnd(0, this.colors.length - 1)]
      },
      getEventColor (event) {
        return event.color
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>